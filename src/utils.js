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
