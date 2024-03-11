
export type DataViewerProps = {
    title: string;
    onRefresh: () => void;
    contentText: string;
    disabled?: boolean;
    contentStyle?: ContentTextStyle;
}

export type ContentTextStyle = 'ERROR' | 'DEFAULT';