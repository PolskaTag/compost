type getItemType = {
    name: string;
}
const getItem = ({name}: getItemType) => {
    const item = fetch('/item/?name='+name, {
        method: 'get'
    })

    return item;
}