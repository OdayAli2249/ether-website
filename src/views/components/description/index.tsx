import { DescriptionProps } from "./types";
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import './styles.scss';



export function Description({ title, text }: DescriptionProps) {

    return (
        <div className={"description-root"}>
            <h6 className="description-title">
                {title}
            </h6>
            <div className={"description-container"}>
                <p className="description-content">
                    {text}
                </p>
            </div>
        </div>
    );
}
