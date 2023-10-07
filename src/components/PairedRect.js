export function PairedRect({rect1, rect2, percent=.5}){
    const style = {
        display: 'flex',
        width: "100%",
    }

    const styleA = {

    }

    const styleB = {

    }

    return (
        <div style={style}>
            <div style={styleA}>
                {rect1}
            </div>
            <div style={styleB}>
                {rect2}
            </div>
        </div>
    )
}