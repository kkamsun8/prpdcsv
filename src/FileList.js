import React, { useState } from 'react'
import File from './File'

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        border: "1px solid",
        padding: 5
    },
    listItem: {
        fontSize: 1,
    }
}));

const FileList = ({ data, readFile }) => {
    console.log(data);

    const fileList = [];
    if (data !== undefined) {
        for (const file of data) {
            fileList.push(file);
        }
    }

    return (
        <div>
            <ul className="overflow-auto m-2 h-64">
                {fileList.map(f =>
                    <File file={f} readFile={readFile} />)}
            </ul>
        </div >
    )
}

export default FileList
