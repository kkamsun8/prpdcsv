import { useState } from 'react';
import _, { map } from 'underscore';
import High from './High'

function App() {
  // const fileInput = useRef()

  const [prpdData, setPrpdData] = useState([[0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48], [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 48], [9, 4, 91]]);

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    if (!file) { return };
    const fileSlice = file.slice(8);
    const reader = new FileReader();
    // reader.readAsBinaryString(e.target.files[0]);
    reader.readAsArrayBuffer(fileSlice);
    reader.onload = () => {
      // const data = reader.result;
      // // const dataSub = data.substr(8); // 헤더 8byte 자르기
      // console.log(dataSub.length);
      // let dataSubArray = dataSub.split('');
      // console.log(`dataSub Array =${dataSubArray}`);
      // let buffer= new ArrayBuffer(dataSubArray.length);
      // let view = new DataView(buffer)

      const buffer = reader.result;
      const view = new DataView(buffer);
      console.log(buffer);
      const prpdDataRow = [];
      for (let index = 0; index < 65536; index++) {
        const data = view.getUint16((index * 2), false);
        prpdDataRow.push(data);
      }
      console.log(prpdDataRow);
      const prpdData = [];
      while (prpdDataRow.length) prpdData.push(prpdDataRow.splice(0, 256));
      console.log(prpdData);

      const prpd = _.unzip(prpdData)
      console.log(prpd)
      const prpdJSON = JSON.stringify(prpd);
      console.log(prpdJSON);
      setPrpdData(prpdJSON);
    };
  }



  return (
    <div className="App">
      <input type="file" onChange={handleChangeFile} accept=".dat2" />
      <High
        data={prpdData}
      />

    </div>
  );
}

export default App;
