import React, { useState, useEffect } from 'react';
import { makeStyles, Button } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles((theme) => ({
    exportButton: {
        float: 'right',
        padding: theme.spacing(1),
        margin: theme.spacing(1)
    },
}));

const ExportButton = (props) => {
    const classes = useStyles();
    const [data, setData] = useState(props.data || null);
    const [filename, setFilename] = useState(props.filename || 'data');
    const [headers, setHeaders] = useState(props.headers || null);
   
    const exportData = () => {
        debugger;
        const firstRow = headers.map(header => header.headerName);
        const rows = [];
        rows.push(firstRow);
        for (const [key, value] of Object.entries(data)) {
            let res = [];
            headers.map(header => {
                if (value.hasOwnProperty(header.field)) {
                    res.push(value[header.field] !== null ? value[header.field].toString().replace(/(\r\n|\n|\r)/gm, "") : " ");
                }
            });
            rows.push(res);
        }

        const fName = `${filename}.csv`;
        let csv = '';
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            for (let j = 0; j < row.length; j++) {
                let val = row[j] === null ? '' : row[j].toString();
                val = val.replace(/\t/gi, " ");
                if (j > 0)
                    csv += ';';
                csv += val;
            }
            csv += '\n';
        }
        // for UTF-16
        let cCode, bArr = [];
        bArr.push(255, 254);
        for (let i = 0; i < csv.length; ++i) {
            cCode = csv.charCodeAt(i);
            bArr.push(cCode & 0xff);
            bArr.push(cCode / 256 >>> 0);
        }
        const blob = new Blob([new Uint8Array(bArr)], { type: 'text/csv;charset=UTF-16LE;' });
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, fName);
        } else {
            let link = document.createElement("a");
            if (link.download !== undefined) {
                const url = window.URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", fName);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                // Timeout is needed for large datasets.
                setTimeout(function () {
                    window.URL.revokeObjectURL(url);
                }, 0);
            }
        }
    };

    useEffect(() => {

    }, [props]);

    return (
        <Button
            variant="contained"
            className={classes.exportButton}
            color="primary"
            startIcon={<GetAppIcon />}
            onClick={() => exportData()}
        >
            Exportera data
        </Button>
    );
};
export default ExportButton;