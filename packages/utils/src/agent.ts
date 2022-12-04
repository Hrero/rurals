/**
 * 是否是移动端
 */
export const checkIsMobile = () => {
    const userAgentInfo = navigator.userAgent;
    const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
    let flag = false;
    // tslint:disable-next-line:prefer-for-of
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = true;
            break;
        }
    }
    return flag || document.documentElement.clientWidth < 640;
}

