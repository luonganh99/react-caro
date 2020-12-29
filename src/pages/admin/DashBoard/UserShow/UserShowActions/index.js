import Button from '@material-ui/core/Button';
import { EditButton, TopToolbar } from 'react-admin';
import { Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom'



const PostShowActions = ({ basePath, data, resource }) => {

    const history = useHistory();

    const handleViewBtnClick = () => {
        console.log("base path: ", basePath)
        console.log("data: ", data)
        console.log("resource: ", resource)
        history.push(`${basePath}/${data.userId}/history`)
    }

    return(
        <TopToolbar>
            <EditButton basePath={basePath} record={data} />
            {/* Add your custom actions */}
            <Button color="primary" onClick={handleViewBtnClick}>View game history</Button>
        </TopToolbar>
    );
}

export default PostShowActions;