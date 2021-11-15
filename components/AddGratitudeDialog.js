
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { TextField, DialogContent } from '@mui/material';
import GratitudesClient from '../clients/GratitudesClient';


const gratitudesFields = Array.from({ length: 5 }, (_, i) => i + 1)
const AddGratitudeDialog = () => {
    const [open, setOpen] = useState(false);
    const [ form, setForm ] = useState({
        title:'',
        item_1:'',
        item_2:'',
        item_3:'',
        item_4:'',
        item_5:'',
    })
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveGratitude = async () => {
        console.log('send', form)
        try {
            await GratitudesClient.add(form)
            setOpen(false);
        } catch (error) {
            console.log('Error saving the gratitude', error)
        }
    }

    const onChangeTitle = ({ target: { value }}) => setForm( {...form,  title: value}) 

    const onChangeGratitudeField = (id) => ({ target: { value }})=> {
        const newForm = {...form}
        newForm[`item_${id}`] = value
        setForm(newForm) 
    }

    return <div>
        <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
            <AddIcon />
        </Fab>
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Agradecimiento
                    </Typography>
                    <Button autoFocus color="inherit" onClick={saveGratitude}>
                        Guardar
                    </Button>
                </Toolbar>
            </AppBar>
            <DialogContent>

                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Titulo"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={onChangeTitle}
                />
                <ul style={{ listStyle: 'none' }}>
                    {gratitudesFields
                        .map(gratitudeField => <li key={gratitudeField}> <TextField
                            autoFocus
                            margin="dense"
                            label={`Agradecimiento ${gratitudeField}`}
                            id="title"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={onChangeGratitudeField(gratitudeField)}
                        />
                        </li>)}

                </ul>
            </DialogContent>
        </Dialog>
    </div>
}
export default AddGratitudeDialog