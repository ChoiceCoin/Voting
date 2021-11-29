import base64
import http.server
import json
import msgpack
import socketserver
import threading

"""
These mock severs are for the v2 indexer/algod path and response tests.

I was unable to get 'before_all' and 'after_all' working anywhere else besides
a file named 'environment.py in this directory. Otherwise all of this would
be in the v2_steps.py file.
"""

def encode_bytes(d):
    if isinstance(d, dict):
        for k, v in d.items():
            if isinstance(v, dict):
                encode_bytes(v)
            elif isinstance(v, list):
                encode_bytes(v)
            else:
                if isinstance(v, bytes):
                    d[k] = base64.b64encode(v).decode()
    elif isinstance(d, list):
        for i in range(len(d)):
            if isinstance(d[i], dict):
                encode_bytes(d[i])
            elif isinstance(d[i], list):
                encode_bytes(d[i])
            else:
                if isinstance(d[i], bytes):
                    d[i] = base64.b64encode(v).decode()
    return d


class PathsHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()
        m = json.dumps({"path": self.path})
        m = bytes(m, "ascii")
        self.wfile.write(m)

    def do_POST(self):
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()
        m = json.dumps({"path": self.path})
        m = bytes(m, "ascii")
        self.wfile.write(m)

def get_status_to_use():
            f = open("test/features/resources/mock_response_status", "r")
            status = f.read()
            f.close()
            #overwrite to default 200 so that tests that don't write above file operate properly
            with open("test/features/resources/mock_response_status", "w") as f:
                f.write('200')
            return int(status)

class FileHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if "mock" in self.path:
            f = open("test/features/resources/mock_response_path", "w")
            f.write(self.path[6:])
            f.close()
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(bytes("done", "ascii"))
        else:
            self.send_response(get_status_to_use())
            self.send_header("Content-type", "application/json")
            self.end_headers()
            f = open("test/features/resources/mock_response_path", "r")
            mock_response_path = f.read()
            f.close()
            f = open("test/features/resources/" + mock_response_path, "r")
            s = f.read()
            f.close()
            if "base64" in mock_response_path:
                s = encode_bytes(msgpack.unpackb(base64.b64decode(s), raw=False))
                self.wfile.write(bytes(json.dumps(s), "ascii"))
            else:
                s = bytes(s, "ascii")
                self.wfile.write(s)


    def do_POST(self):
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()
        f = open("test/features/resources/mock_response_path", "r")
        mock_response_path = f.read()
        f.close()
        f = open("test/features/resources/" + mock_response_path, "r")
        s = f.read()
        f.close()
        s = bytes(s, "ascii")
        self.wfile.write(s)


def before_all(context):
    # Install path server
    socketserver.TCPServer.allow_reuse_address = True
    context.path_server = socketserver.TCPServer(("", 0), PathsHandler)
    _, context.path_server_port = context.path_server.server_address
    context.path_thread = threading.Thread(target=context.path_server.serve_forever)
    context.path_thread.start()

    # Install route server
    socketserver.TCPServer.allow_reuse_address = True
    context.response_server = socketserver.TCPServer(("", 0), FileHandler)
    _, context.response_server_port = context.response_server.server_address
    context.response_thread = threading.Thread(target=context.response_server.serve_forever)
    context.response_thread.start()


def after_all(context):
    # Shutdown path server
    context.path_server.shutdown()
    context.path_thread.join()

    # Shutdown route server
    context.response_server.shutdown()
    context.response_thread.join()
