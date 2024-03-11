import { DataViewerProps } from "./types";
import { faRefresh, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import './styles.scss';



export function DataViewer({ title, contentText, onRefresh, contentStyle, disabled = false }: DataViewerProps) {

    return (
        <div className={clsx("data-viewer-root", disabled ? "opacity" : null)}>
            <div className="data-viewer-header">
                <h6 className="data-viewer-header-title">
                    {title}
                </h6>
                {!disabled ? <FontAwesomeIcon icon={faRefresh} className='data-viewer-header-icon' onClick={onRefresh} /> :
                    <FontAwesomeIcon icon={faSpinner} className='data-viewer-header-icon' onClick={onRefresh} />}
            </div>
            <div className="data-viewer-body">
                <p className={clsx("data-viewer-body-content", contentStyle === 'ERROR' ? 'error-text' : undefined)}>
                    {contentText}
                </p>
            </div>
        </div>
    );
}
