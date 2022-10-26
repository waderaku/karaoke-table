import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useFooterSelected } from '../Domain/hooks/useFooterSelected';
import { FooterValue } from '../Domain/type';
import { SVGIcon } from './SVGIcon/SVGIcon';

export const Footer = () => {
    const { footerValue, onChange } = useFooterSelected();

    return (
        <BottomNavigation
            showLabels
            value={footerValue}
            onChange={onChange}
        >
            <BottomNavigationAction label="Anime" icon={<SVGIcon path={"svg/anime.svg"} width={32} />} value={FooterValue.ANIMATION} />
            <BottomNavigationAction label="Character" icon={<SVGIcon path={"svg/character.svg"} width={22} />} value={FooterValue.CHARACTER} />
            <BottomNavigationAction label="Actor" icon={<SVGIcon path={"svg/actor.svg"} width={32} />} value={FooterValue.ACTOR} />
        </BottomNavigation>
    )
}