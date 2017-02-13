window.api = (function () {
    var api = {
        get: function (cb) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "/api/stats", true);
            xhr.onload = function (e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log(xhr.responseText);
                        cb(null,xhr.responseText);
                    } else {
                        console.error(xhr.statusText);
                        cb(e, null);
                    }
                }
            };
            xhr.onerror = function (e) {
                console.error(xhr.statusText);
                cb(e, null);
            };
            xhr.send(null);

        }
    };

    return api;
}());