import React from 'react';
import {
    makeStyles,
    Box,
    Collapse,
    IconButton,
    TableContainer,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    Checkbox,
    TableRow,
    Divider,
    Avatar,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import testURL from './functions';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

type rowProps = {
    row: any;
    isSelected: boolean;
    handleClick: (e: any, row: any) => void;

};
function CollapsibleRow(props: rowProps) {
    const { row, isSelected, handleClick } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    React.useEffect(() => {

    }, [isSelected]);

    const createColumnsWithinCollapse = (columns:any) => {
        { hej: 1, dig: "t", r: 5, e: 7},
        for (let property )
        const collapseColumns = columns.map((column:any, index:number) => {
            
            if (index % 3 === 0) {
                return 
            }
        });
    };
    return (
        <React.Fragment>
            <TableRow
                className={classes.root}
                hover
                role="checkbox"
                aria-checked={isSelected}
                tabIndex={-1}
                selected={isSelected}
            >
                {
                    Object.keys(row).map((key:any, index:number) => {
                        const isUrl = testURL(row[key]);
                        if (index === 0) {
                            return (
                                <TableCell component="th" scope="row">
                                    {!isUrl ? row[key] : <Avatar alt="Remy Sharp" src={row[key]} />}
                                </TableCell>
                            )
                        }
                        else if (index > 0 && index < 3) {
                           
                            return (
                                <TableCell align="right">
                                    {!isUrl ? row[key] : <Avatar alt="Remy Sharp" src={row[key]} />}
                                </TableCell>
                            )
                            break;
                        }
                        else {

                        }
                        return (
                            <TableCell padding="checkbox">
                                <Checkbox
                                    onClick={(event) => handleClick(event, row)}
                                    checked={isSelected}
                                    inputProps={{ 'aria-labelledby': row.id }}
                                />

                            </TableCell>
                        )
                    })
                }
                <TableCell padding="checkbox">
                    <Checkbox
                        onClick={(event) => handleClick(event, row)}
                        checked={isSelected}
                        inputProps={{ 'aria-labelledby': row.id }}
                    />
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.oid}
                </TableCell>
                <TableCell align="right">{row.category}</TableCell>
                <TableCell align="right">{row.typeOfUse}</TableCell>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Divider />
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Motiv</b></TableCell>
                                        <TableCell><b>Bestämmelseformulering</b></TableCell>
                                        <TableCell><b>Typ</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {row.motive}
                                        </TableCell>
                                        <TableCell>{row.decisionDescription}</TableCell>
                                        <TableCell align="right">{row.type}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><b>Följer föreskrift</b></TableCell>
                                        <TableCell><b>Förbättrat Underlag</b></TableCell>
                                        <TableCell><b>Korrigerade Gränser</b></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>{row.followSpecifications ? "Ja" : "Nej"}</TableCell>
                                        <TableCell>{row.improved ? "Ja" : "Nej"}</TableCell>
                                        <TableCell>{row.correctedBorders}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><b>Digitaliseringsnivå</b></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>{row.digitalLevel}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};


type tableProps = {
    rows: Array<any>;
    onSelected: (selected: any) => void;
}


const CollapsibleTable: React.FunctionComponent<tableProps> = (props) => {
    const { rows, onSelected } = props;
    const [selected, setSelected] = React.useState<string | null>(null);
    const isSelected = (id: string) => selected === id ? true : false;

    const handleClick = (event: React.MouseEvent<unknown>, row: any) => {
        const selectedIndex = selected === row.id ? true : false;

        if (!selectedIndex) {
            setSelected(row.id);
            onSelected(row);
        } else {
            setSelected(null);
            onSelected(null);
        }
    };

    React.useEffect(() => {

    }, [rows, selected]);
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell align="right"><b>ID</b></TableCell>
                        <TableCell align="right"><b>Kategori</b></TableCell>
                        <TableCell align="right"><b>Användningsområde</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => {
                        const isRowSelected = isSelected(row.id);
                        return <CollapsibleRow handleClick={handleClick} key={`${row.id}-${row.data.id}`} data={row} isSelected={isRowSelected} />
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default CollapsibleTable;

