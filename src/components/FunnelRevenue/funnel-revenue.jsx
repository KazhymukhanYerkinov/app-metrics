import React from 'react';

const FunnelRevenue = () => {
  const data = [{name: 'Заявки', count: '20'},
                {name: 'Средний чек', count: '8 000'},
                {name: 'Выручка', count: '80 000'},
                {name: 'Расходы на рекламу', count: '10 000'},
                {name: 'Стоимость просмотра', count: '50,00%'},
                {name: 'Средняя цена за клик', count: '15'},
                {name: 'Количество кликов', count: '100'}]
                
  return (
    <div className = 'funnel-revenue'>
      <div className = 'funnel-revenue__header'>
        <div className = 'funnel-revenue__title'> Funnel Revenue </div>
      </div>

      <div className = 'funnel-revenue__content'>
        
          {data.map((item, index) => (
            <div className = 'funnel-revenue__items' key = { index }>
              <div> { item.name } </div>
              <div> { item.count } </div>
            </div>
          ))}
          
      </div>
    </div>
  )
}

export default FunnelRevenue;