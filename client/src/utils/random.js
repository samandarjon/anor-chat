const getRandomUrl = (name) => {
    if(name){
        return "https://ui-avatars.com/api/?background=" + getRandomColor() + "&color=fff&name="+name.split(" ").join("+")
    }
    return "https://ui-avatars.com/api/?background=" + getRandomColor() + "&color=fff&name="
}
const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = "";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
export default getRandomUrl;
