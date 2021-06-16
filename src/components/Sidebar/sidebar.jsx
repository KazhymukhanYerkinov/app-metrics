import { sidebar } from '../../data/sidebar';

const Sidebar = () => {
  return (
    <div className = 'sidebar'>
      <div className = 'sidebar__inner'>

        <div className = 'sidebar__items'>
          { sidebar.map((item, index) => (
            <div key = { index } className = 'sidebar__item'>
              <div className = 'sidebar__item--image'> { item.image } </div>
              <div className = 'sidebar__item--name'> { item.name } </div>
            </div>
          )) }
        </div>

        <div className = 'sidebar__pay'>
          <div className = 'sidebar__pay--inner'>
            <div className = 'sidebar__credits'>
              <div> Credits </div>
              <div> 993 </div>
            </div>

            <div className = 'sidebar__plan'>
              <div> Plan </div>
              <div> Free </div>
            </div>

            <div className = 'sidebar__refill'>
              <div> Next refill </div>
              <div> 7 days </div>
            </div>

            <button className = 'sidebar__button'> Upgrade plan  </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Sidebar;