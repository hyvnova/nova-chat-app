export default function Response({props}) {
    let { content } = props

    return (
        <p>
            {content}
        </p>
    );
}