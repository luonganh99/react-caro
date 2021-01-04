import Button from '@material-ui/core/Button';
import { EditButton, TopToolbar } from 'react-admin';
import { Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom'



const PostShowActions = ({ basePath, data, resource }) => {

    const history = useHistory();

    return(
        <TopToolbar>
            <EditButton basePath={basePath} record={data} />
            {/* Add your custom actions */}
        </TopToolbar>
    );
}

export default PostShowActions;