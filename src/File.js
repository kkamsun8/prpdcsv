import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'white',
    },
    text: {
        color: "red",
    }
}))

const File = ({ file, readFile }) => {
    console.log(file);
    const fileName = file.name;
    const fileData = file;

    const classes = useStyles();

    return (
        <>
            <li
                button
                onClick={() => readFile(fileData)}
                className="text-xs hover:bg-blue-100 cursor-pointer"
            >
                {fileName}
            </li>
            <hr />
        </>
    )
}

export default File
