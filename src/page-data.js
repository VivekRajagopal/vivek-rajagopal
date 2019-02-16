const Pages = [
    "home.md",
    "about.md",
    "blog.md",
    "blog/blog-zero.md",
    "blog/markdown-blogup.md",
    "blog/dime-for-time.md",
    "blog/react-noteapp.md",
    "blog/test.md",
    "demo.md",
    "cv.md",
].map(el => "/page-data/" + el);

/*
const doesPageExist = pageName => {
    return (PageData.filter(page => page.name === pageName).length > 0)
}

const getPageData = pageName => {
    const result = PageData.filter(page => page.name === pageName);
    if (result.length) return result[0] 
    else return null;
}
*/

const doesPageExist = pageName => {
    return (Pages.indexOf(pageName) >= 0);
}

export default Pages;
export {doesPageExist}