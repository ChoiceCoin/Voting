const canva  = document.getElementById("canva");

const qrCode = () => {
      canva.hidden = false
    QRCode.toCanvas(document.getElementById('canvas'), {wallet:"AMESZ5UX7ZJL5M6GYEHXM63OMFCPOJ23UXCQ6CVTI2HVX6WUELYIY262WI", label:"emg110@gmail.com"}, function (error) {
        if (error) console.error(error)
        console.log('success!');
      })
}

