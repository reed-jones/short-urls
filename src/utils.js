export function makeId(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// resolveLink.href === `https://go.j0.nz/${short}`
export const resolveLink = ({ short }) => ({
    href: `${window.origin}/${short}`,
    base: `${window.origin}/`,
    code: short
})

export function copyLink(link) {
    const el = document.createElement("input");
    el.value = resolveLink(link).href;
    el.style.opacity = 0
    el.style.position = 'absolute'
    el.style.pointerEvents = 'none'
    document.body.appendChild(el);
    el.select();
    document.execCommand("Copy");
    document.body.removeChild(el);
}

// https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
export function createUuid(format = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx') {
    return format.replace(/[xy]/g, function (c, r, v) {
        return r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8), v.toString(16);
    });
}

export const fingerprint = {
    get() {
        const uuid = localStorage.getItem('fingerprint')
        if (uuid) {
            return uuid;
        }

        // if no fingerprint is stored, create a new
        return this.set();
    },

    set(uuid = createUuid()) {
        localStorage.setItem('fingerprint', uuid)
        return localStorage.getItem('fingerprint')
    }
}


export const { stringify, parse } = JSON;
