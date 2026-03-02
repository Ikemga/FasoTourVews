import GeneriqueHeader from './GeneriqueHeader';
import SiteCard from './SiteCard';


const Sites= () =>{
    return(
        <div className="m-30 bg-[#f7f7f7] p-10">
            
            <GeneriqueHeader
            title="Découvrir"
            label="Sites Touristiques Populaires"
            text="Explorez les trésors cachés du Burkina Faso, des sites classés UNESCO aux merveilles naturelles."
            />

            <div className="flex justify-between items-center">
            <SiteCard
            imageSrc="uguiug"
            title="kmjdkjgitu"
            localisation="mkvjr"
            note="rljk"
            type="ljkgtbe"
            />

            <SiteCard
            imageSrc="uguiug"
            title="kmjdkjgitu"
            localisation="mkvjr"
            note="rljk"
            type="ljkgtbe"
            />

            <SiteCard
            imageSrc="uguiug"
            title="kmjdkjgitu"
            localisation="mkvjr"
            note="rljk"
            type="ljkgtbe"
            />

            <SiteCard
            imageSrc="uguiug"
            title="kmjdkjgitu"
            localisation="mkvjr"
            note="rljk"
            type="ljkgtbe"
            />
            </div>
        </div>

    )
}

export default Sites;