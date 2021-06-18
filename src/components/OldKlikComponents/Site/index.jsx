import React from 'react';
import classes from './Site.module.css'

const Site = ({ domain }) => (
    <div className={classes.site}>
        <img width={20} alt={domain} src={`https://icons.duckduckgo.com/ip3/${domain}.ico`} />
        <span>{domain}</span>
    </div>
)

export default Site;