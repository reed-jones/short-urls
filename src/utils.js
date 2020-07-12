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

export const { stringify, parse } = JSON;
