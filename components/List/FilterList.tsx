import { Button } from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";
import TooltipElement from "../TooltipElement";

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
        <form>
            <input type="text" placeholder={placeholder}
                onChange={(e) => handleChange(filter(e.target.value))} />

            <TooltipElement keyName='topCancel' placement='top' text='Limpar filtro'
                component={(
                    <Button type='reset' onClick={() => handleChange(filter(""))} variant="danger" className='ml-1 mb-1'>
                        <XCircle />
                    </Button>
                )}>
            </TooltipElement>
        </form>
    );
}

export default FilterList;