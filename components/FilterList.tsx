
const FilterList: React.FC<{ placeholder, list: Array<any>, propertName?: string, handleChange }> = ({ placeholder, list, propertName, handleChange }) => {

    const filter = (searchValue: string) => {
        if (!list)
            list = new Array<any>();

        const listReturn = list.filter(item => {
            if (propertName) {
                return item[propertName]?.toLowerCase()?.includes(searchValue?.toLowerCase());
            } else {
                const itemFind = Object.values(item)
                    .filter(i => String(i)
                        .toLowerCase()
                        .includes(searchValue?.toLowerCase()));
                
                return itemFind?.length > 0;
            }
        });
        return listReturn;
    }

    return (
        <div className="row">
            <div className="col">
                <input type="text" placeholder={placeholder}
                    onChange={(e) => handleChange(filter(e.target.value))} />
            </div>
        </div>
    );
}

export default FilterList;