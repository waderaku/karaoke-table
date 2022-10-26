export const SVGIcon = (props: { path: string, width: number }) => {
    return (
        <img width={props.width} src={props.path} />
    )
}