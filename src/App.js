import { useState } from 'react';
import _, { map } from 'underscore';
import D3Test from './D3Test';
import FileList from './FileList';
import PRPDGraph from './PRPDGraph';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import JSZip from 'jszip';
import saveAs from 'file-saver';
import './index.css';

const zip = new JSZip();

const useStyles = makeStyles(() => ({
  input: {
    padding: 10,
  },
  wrapper: {
    display: "flex"
  }
}))


function App() {
  // const fileInput = useRef()

  const [prpdData, setPrpdData] = useState([[0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48], [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 48], [9, 4, 91]]);
  const [csvData, setCsvData] = useState(``);
  const [data, setData] = useState([1, 2, 3]);
  const [fileList, setFileList] = useState();

  const handleChangeFile = (e) => {
    const file = e.target.files[0]; //file 입력
    console.log(`file=${file}`)
    if (!file) { return }; // file이 없을 경우 return
    const fileSlice = file.slice(8); // 파일의 Header 8Byte 이후
    const reader = new FileReader(); // FileReader 객체 생성
    reader.readAsArrayBuffer(fileSlice); // 파일 Read
    reader.onload = () => {  // 파일을 다읽게 되면 콜백
      // const data = reader.result;
      // // const dataSub = data.substr(8); // 헤더 8byte 자르기
      // console.log(dataSub.length);
      // let dataSubArray = dataSub.split('');
      // console.log(`dataSub Array =${dataSubArray}`);
      // let buffer= new ArrayBuffer(dataSubArray.length);
      // let view = new DataView(buffer)

      const buffer = reader.result;
      const view = new DataView(buffer);
      const prpdDataRow = [];
      for (let index = 0; index < 65536; index++) {
        const data = view.getUint16((index * 2), false);
        prpdDataRow.push(data);
      }

      setData(prpdDataRow);



      // const prpdData = [];
      // while (prpdDataRow.length) prpdData.push(prpdDataRow.splice(0, 256));
      // // console.log(`PRPDData=${prpdData}`);
      // const prpd = _.unzip(prpdData)

      // let chartData = [];

      // for (let index = 0; index < prpd.length; index++) {
      //   const buffer = prpd[index];
      //   for (let j = 0; j < prpd[index].length; j++) {
      //     chartData.push([j, index, buffer[j]]);
      //   }
      // }

      // // var csv = chartData.map(function (d) {
      // //   return d.join();
      // // }).join('\n');
      // // csv = `y,x,value\n` + csv;
      // // // console.log(csv);
      // // setCsvData(csv);
      // setPrpdData(chartData);
    };
  }

  const handleChangeFolder = (e) => {
    console.log(`handleChangeFolder=${e.target.files.length}`);
    setFileList(e.target.files);
  }

  const readFile = (file) => {
    if (!file) { return }; // file이 없을 경우 return
    const fileSlice = file.slice(8); // 파일의 Header 8Byte 이후
    const reader = new FileReader(); // FileReader 객체 생성
    reader.readAsArrayBuffer(fileSlice); // 파일 Read
    reader.onload = () => {  // 파일을 다읽게 되면 콜백
      const buffer = reader.result;
      const view = new DataView(buffer);
      const prpdDataRow = [];
      for (let index = 0; index < 65536; index++) {
        const data = view.getUint16((index * 2), false);
        prpdDataRow.push(data);
      }
      setData(prpdDataRow);
    };
  }

  const makePRPDZip = function (zip, fileList) {
    return new Promise(function (resolve, reject) {
      for (const file of fileList) {
        const fileSlice = file.slice(8); // 파일의 Header 8Byte 이후
        const reader = new FileReader(); // FileReader 객체 생성
        reader.readAsArrayBuffer(fileSlice); // 파일 Read
        reader.onload = async () => {  // 파일을 다읽게 되면 콜백
          const buffer = reader.result;
          const view = new DataView(buffer);
          const prpdDataRow = [];
          for (let index = 0; index < 65536; index++) {
            const data = view.getUint16((index * 2), false);
            prpdDataRow.push(data);
          }
          const prpdData2D = [];
          while (prpdDataRow.length) prpdData2D.push(prpdDataRow.splice(0, 256));
          const prpdCsv = prpdData2D.map((d) => d.join()).join('\n');
          await zip.file(file.name, prpdCsv);
        }
      }
    })
  }

  const SaveFile = async () => {
    console.log(fileList.length);
    for (let index = 0; index < fileList.length; index++) {
      const file = fileList[index];
      const fileSlice = file.slice(8); // 파일의 Header 8Byte 이후
      const reader = new FileReader(); // FileReader 객체 생성
      reader.readAsArrayBuffer(fileSlice); // 파일 Read
      reader.onload = async () => {  // 파일을 다읽게 되면 콜백
        const buffer = reader.result;
        const view = new DataView(buffer);
        const prpdDataRow = [];
        for (let index = 0; index < 65536; index++) {
          const data = view.getUint16((index * 2), false);
          prpdDataRow.push(data);
        }
        const prpdData2D = [];
        while (prpdDataRow.length) prpdData2D.push(prpdDataRow.splice(0, 256));
        const prpdData = _.unzip(prpdData2D)
        const prpdCsv = prpdData.map((d) => d.join()).join('\n');
        await zip.file(file.name.replace('.dat2', '.csv'), prpdCsv);
        if (index === (fileList.length - 1))
          zip.generateAsync({ type: "blob", compression: "DEFLATE" })
            .then((blob) => { saveAs(blob, "test.zip"); })
      }
    }



    // zip.file("Hello.txt", "Hello World\n");
    // zip.folder("images");
    // zip.generateAsync({ type: "blob" })
    //   .then((blob) => { saveAs(blob, "test.zip"); })
  }

  const classes = useStyles();

  return (
    <div className="App">
      <h1 className="bg-blue-500 text-white m-1 p-1">PRPD to CSV</h1>
      <div className={classes.input}>
        <label className="bg-blue-500 m-1 p-1 hover:bg-blue-700 text-white py-1 px-4 rounded">
          Upload Folder
          <input type="file" onChange={handleChangeFolder} id="folder-upload" name="folder[]" webkitdirectory="" directory="" hidden />
        </label>
        <button className="bg-blue-500 m-1 p-1 hover:bg-blue-700 text-white py-1 px-4 rounded" onClick={SaveFile}>Download</button>
      </div>
      <div className={classes.wrapper}>
        <FileList data={fileList} readFile={readFile}></FileList>
        <PRPDGraph data={data} />
      </div>
    </div>
  );
}

export default App;
