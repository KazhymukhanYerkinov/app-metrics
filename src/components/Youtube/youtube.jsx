import { DownOutlined, MoreOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Progress, Button } from 'antd';
import React from 'react';
import youtube from '../../assets/youtube.svg';


const Youtube = () => {
  let tbody = [{name: 'WebDev', show: 32143, conversion: 12, sum: -42000, price: 0.15},
    {name: 'PyCoding', show: 4322, conversion: 17, sum: 34000, price: 2.32},
    {name: 'Олег Молчанов', show: 76, conversion: 1, sum: -42000, price: 0.98},
    {name: 'UpSkill', show: 3682, conversion: 21, sum: 50000, price: 1.84},]

  const [ percent, setPercent ] = React.useState(0);

  const decline = () => {
    setPercent((prevPrecent) => {
      let tempPrecent = prevPrecent - 5;
      if (tempPrecent < 0) {
        return 0;
      }

      return prevPrecent - 5;
    })
  }

  const increase = () => {
    setPercent((prevPrecent) => {
      let tempPrecent = prevPrecent + 5;
      if (tempPrecent > 100) {
        return 100;
      }
      return prevPrecent + 5;
    })
  }
  

  return (
    <div className = 'youtube'>

      <div className = 'youtube__header'>
        <button className = 'youtube__button youtube__button--first active'> Каналы </button>
        <button className = 'youtube__button'> Ключ. слова </button>
        <button className = 'youtube__button'> Видео </button>
      </div>


      <div className = 'youtube__content'>
        <table>
          <thead>
            <tr>
              <th> Название <DownOutlined /> </th>
              <th> Просмотры <DownOutlined /> </th>
              <th> Конверсия <DownOutlined /> </th>
              <th> Сумма <DownOutlined /> </th>
              <th> Ср. цена за клик <DownOutlined /> </th>
              <th> &nbsp; </th>
            </tr>
          </thead>

          <tbody>
            { tbody.map((item, index) => (
              <tr key ={ index }>
                <td> <img src = { youtube } alt = '' /> { item.name } </td>
                <td> { item.show } </td>
                <td> { item.conversion }% </td>
                <td> { item.sum }T </td>
                <td> ${ item.price } </td>
                <td> <MoreOutlined className = 'youtube__more-points'/> </td>
              </tr>

            )) }
          </tbody>
        </table>
      </div>



      <div className = 'youtube__footer'>
        <Progress format = {(value) => <div style={{ color: 'white' }}>{value}% </div>}  percent = { percent }/>

        <div className = 'youtube__progress'>
          <Button.Group>
            <Button onClick = { decline } icon={<MinusOutlined />} />
            <Button onClick = { increase } icon={<PlusOutlined />} />
          </Button.Group>

          <button className = 'youtube__trim'> Урезать </button>
        </div>
      </div>

    </div>
  )
}

export default Youtube;

