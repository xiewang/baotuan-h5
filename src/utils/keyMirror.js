const keyMirror = function keyMirror(obj) {
    const ret = {};
    let key;
    if (!(obj instanceof Object && !Array.isArray(obj))) return;

    for (key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue;
        }
        ret[key] = key;
    }
    return ret;
};

export default keyMirror;
