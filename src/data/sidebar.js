import { ReactComponent as Multi } from '../assets/sidebar/multi.svg';
import { ReactComponent as Mode } from '../assets/sidebar/mode.svg';
import { ReactComponent as Diagnos } from '../assets/sidebar/diagnos.svg';
import { ReactComponent as Guides } from '../assets/sidebar/guides.svg';
import { ReactComponent as Settings } from '../assets/sidebar/settings.svg';


export const sidebar = [
    {id: 1, image: <Multi />, name: 'Multi-page', url: 'multi'},
    {id: 2, image: <Mode />, name: 'A/B mode', url: 'mode'},
    {id: 3, image: <Diagnos />, name: 'Diagnostics', url: 'diagnos'},
    {id: 4, image: <Guides />, name: 'Guides', url: 'guides'},
    {id: 5, image: <Settings />, name: 'Settings', url: 'settings'},

]