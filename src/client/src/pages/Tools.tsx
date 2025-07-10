import {type FC, memo} from "react";
import ToolsTable from "../layouts/ToolsTable.tsx";

const Tools: FC = () => {
    return (
        <main>
            <ToolsTable/>
        </main>
    )
}

export default memo(Tools);