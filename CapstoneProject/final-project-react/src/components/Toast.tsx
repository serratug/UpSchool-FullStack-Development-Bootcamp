import React, {useEffect, useState} from "react";
import Alert from '@mui/material/Alert';

export interface ToastProps {
    destroy: () => void;
    title: string;
    content: string;
    duration?: number;
}

const Toast: React.FC<ToastProps> = (props) => {
    const { destroy, content, title, duration = 0 } = props;
    const [isSuccess, setIsSuccess ] = useState<boolean>(false);
    const [isError, setIsError ] = useState<boolean>(false);

    useEffect(() => {

        if (title === "success"){
            setIsSuccess(true);
            setIsError(false);
        }
        else if (title === "error"){
            setIsError(true);
            setIsSuccess(false)
        }
        else {
            setIsError(false);
            setIsSuccess(false)
        }

        if (!duration) return;

        const timer = setTimeout(() => {
            destroy();
        }, duration);

        return () => clearTimeout(timer);
    }, [destroy, duration]);

    return (
        <div>
            { isSuccess &&
                <Alert severity="success">
                    {content}
                </Alert>
            }
            { isError &&
                <Alert severity="error">
                    {content}
                </Alert>
            }
            { !isSuccess && !isError &&
                <Alert severity="info">
                    {content}
                </Alert>
            }

        </div>

        // <div>
        //     <div className={"toast-header"}>
        //         <div>{title} {id}</div>
        //         <button onClick={destroy}>X</button>
        //     </div>
        //     <div className={"toast-body"}>{content}</div>
        // </div>
    );
};

export default Toast;