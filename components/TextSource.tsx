import Router from "next/router";

export type TextSourceProps = {
    id: number;
    title: string;
    text: string;
};

const TextSource: React.FC<{ textSource: TextSourceProps }> = ({ textSource }) => {
    return (
        <div onClick={() => Router.push("/text-source/[id]", `/text-source/${textSource.id}`)}>
            <h2>{textSource.title}</h2>
            <style jsx>{`
          div {
            color: inherit;
            padding: 2rem;
          }
        `}</style>
        </div>
    );
};

export default TextSource;
