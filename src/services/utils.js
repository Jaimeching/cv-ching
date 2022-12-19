module.exports={
    handle : (promise) => {
        return promise
            .then(data => ([data, undefined]))
            .catch(error => Promise.resolve([undefined, error]));
    },
    isEmpty : function (value) {
        return (value == null || value.length === 0);
    },
    onlyNumbers : (str) => {
        return /^[0-9]+$/.test(str);
    }
} 