import {

    useState,

    useCallback,

    useEffect

} from "react";
import {

    uploadDocument,

    getDocuments,

    deleteDocument

} from "../services/api";

export default function useDocuments() {

    // ==================================================
    // States
    // ==================================================

    const [file, setFile] = useState(null);

    const [documents, setDocuments] = useState([]);

    const [uploading, setUploading] = useState(false);

    const [uploadSuccess, setUploadSuccess] = useState(false);

    const [uploadError, setUploadError] = useState(null);

    const [loadingDocuments, setLoadingDocuments] = useState(false);

    // ==================================================
    // Load Documents
    // ==================================================

    const loadDocuments = useCallback(async () => {

        try {

            setLoadingDocuments(true);

            const response = await getDocuments();

            setDocuments(

                response.data.documents || []

            );

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoadingDocuments(false);

        }

    }, []);

    // ==================================================
    // Initial Load
    // ==================================================

    useEffect(() => {

        loadDocuments();

    }, [loadDocuments]);

    // ==================================================
    // Upload Document
    // ==================================================

    const uploadFile = async () => {

        if (!file) {

            alert("Please select a document.");

            return;

        }

        try {

            setUploading(true);

            setUploadSuccess(false);

            setUploadError(null);

            const formData = new FormData();

            formData.append(

                "file",

                file

            );

            await uploadDocument(formData);

            setUploadSuccess(true);

            setFile(null);

            await loadDocuments();

        }

        catch (error) {

            console.error(error);

            setUploadError(error);

            throw error;

        }

        finally {

            setUploading(false);

        }

    };

    // ==================================================
    // Delete Document
    // ==================================================

    const removeDocument = async (

        documentId

    ) => {

        try {

            await deleteDocument(

                documentId

            );

            await loadDocuments();

        }

        catch (error) {

            console.error(error);

            setUploadError(error);

        }

    };

    return {

        file,

        setFile,

        documents,

        loadDocuments,

        removeDocument,

        uploading,

        uploadSuccess,

        uploadError,

        loadingDocuments,

        uploadFile

    };

}