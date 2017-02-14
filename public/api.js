window.api = (function () {
    let api = {
        get: function (url, cb) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onload = function (e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        cb(null, xhr.responseText);
                    } else {
                        cb(e, null);
                    }
                }
            };
            xhr.onerror = function (e) {
                cb(e, null);
            };
            xhr.send(null);

        }
    };

    return api;
}());