var Formoid = (function () {

    var API_URL = ('https:' == location.protocol ? 'https:' : 'http:') + '//formoid.net/api/push';

    function $ajax(url, settings) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(settings.type, url);
            xhr.onload = function () {
                if (xhr.status !== 200) {
                    return reject(new Error('Incorrect server response.'));
                }
                resolve(xhr.responseText);
            };
            xhr.onerror = function () {
                var message = 'Failed to query the server. ';
                if ('onLine' in navigator && !navigator.onLine) {
                    message += 'No connection to the Internet.';
                } else {
                    message += 'Check the connection and try again.';
                }
                reject(new Error(message));
            };
            xhr.send(settings.data);
        })
    };

    var prop = function (name, args) {
        name = '__' + name + '__';
        if (args.length) {
            this[name] = args[0];
            return this;
        }
        return this[name];
    };

    var Form = function (settings) {
        settings = settings || {};
        this.__email__ = settings.email || '';
        this.__title__ = settings.title || '';
        this.__data__ = settings.data || [];
    };

    Form.prototype.email = function (value) {
        return prop.call(this, 'email', arguments);
    };

    Form.prototype.title = function (value) {
        return prop.call(this, 'title', arguments);
    };

    Form.prototype.data = function (value) {
        return prop.call(this, 'data', arguments);
    };

    Form.prototype.send = function (data) {
        return $ajax(API_URL, {
            type: 'POST',
            data: JSON.stringify({
                email: this.__email__,
                form: {
                    title: this.__title__,
                    data: (arguments.length ? data : this.__data__)
                }
            })
        })
        .then(function(responseText) {
            try {
                var data = JSON.parse(responseText);
                if (data.error) throw new Error(data.error);
                return data.response;
            } catch (e) {
                throw new Error('Incorrect server response.');
            }
        });
    };

    return {
        Form: function (settings) {
            return new Form(settings);
        }
    }

})();

var isValidEmail = function (input) {
    return input.value ? /^([^@]+?)@(([a-z0-9]-*)*[a-z0-9]+\.)+([a-z0-9]+)$/i.test(input.value) : true;
};

var formComponents = document.querySelectorAll('[data-form-type="formoid"]');

formComponents.forEach(function (component) {
    var formData,
        form = component.tagName === 'FORM' ? component : component.querySelector('form'),
        alert = component.querySelector('[data-form-alert]'),
        title = component.getAttribute('data-form-title') ? component : component.querySelector('[data-form-title]'),
        submit = component.querySelector('[type="submit"]'),
        inputArr = component.querySelectorAll('[data-form-field]'),
        alertSuccess = alert.innerHTML;

    form.addEventListener('change', function (event) {
        if (event.target.type === 'file') {
            if (event.target.files[0].size > 1000000) {
                alert.removeAttribute('hidden');
                alert.classList.remove('alert-success');
                alert.classList.add('alert-danger');
                alert.innerHTML = 'File size must be less than 1mb';
                submit.classList.add('btn-loading');
                submit.setAttribute('disabled', true);
            }
        }
    });

    form.addEventListener('submit', function (event) {
        event.stopPropagation();
        event.preventDefault();

        if (submit.classList.contains('btn-loading')) return;

        var inputs = inputArr;

        form.classList.add('form-active');
        submit.classList.add('btn-loading');
        submit.setAttribute('disabled', true);
        alert.innerHTML = '';

        formData = formData || Formoid.Form({
            email: component.querySelector('[data-form-email]').value,
            title: title.getAttribute('data-form-title') || title.innerText
        });

        function parseInput(input) {
            return new Promise(function (resolve, reject) {
                // valide email
                if (input.getAttribute('name') === 'email' && !isValidEmail(input)) {
                    return reject(new Error('Form is not valid'));
                }
                var name = input.getAttribute('data-form-field') || input.getAttribute('name');
                switch (input.getAttribute('type')) {
                    case 'file':
                        var file = input.files[0];
                        if (!file) return resolve();
                        var reader = new FileReader()
                        reader.onloadend = function () {
                            resolve([name, reader.result]);
                        };
                        reader.onerror = function () {
                            reject(reader.error);
                        };
                        reader.readAsDataURL(file);
                        break;
                    case 'checkbox':
                        resolve([name, input.checked ? input.value : 'No']);
                        break;
                    case 'radio':
                        resolve(input.checked && [name, input.value]);
                        break;
                    default:
                        resolve([name, input.value]);
                }
            });
        }

        Promise
            .all(Array.prototype.map.call(inputs, function (input) { return parseInput(input); }))
            .then(function (data) { return formData.send(data.filter(function (v) { return v; })); })
            .then(function (message) {
                form.reset();
                form.classList.remove('form-active');
                alert.innerText = alertSuccess || message;
                alert.classList.remove('alert-danger');
                alert.classList.add('alert-success');
            }, function (err) {
                alert.innerText = err.message;
                alert.classList.remove('alert-success')
                alert.classList.add('alert-danger')
            })
            .then(function () {
                submit.classList.remove('btn-loading');
                submit.removeAttribute('disabled');
                alert.removeAttribute('hidden');
            });
    });

    inputArr.forEach(function (elem) {
        elem.addEventListener('focus', function () {
            alert.setAttribute('hidden', 'hidden');
            alert.classList.add('alert-success')
            alert.classList.remove('alert-danger');
            alert.innerHTML = '';
            submit.classList.remove('btn-loading')
            submit.removeAttribute('disabled');
        });
    });
})