import React, { useState } from 'react'
import File from './File'



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
