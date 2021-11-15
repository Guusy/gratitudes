import { Card, CardContent, TextField } from "@mui/material"
import { useState } from "react"


const GratitudesFilters = ({ gratitudes, onFilter }) => {
    const [titleFilter, setTitleFilter ] = useState('')

    const onChangeFilter = ({ target: { value }}) => {
        setTitleFilter(value)
        const newGratitudes =  gratitudes.filter(gratitude => gratitude.title.includes(value))
        onFilter(newGratitudes)
    }
    return <Card style={{ marginBottom: '1rem' }}>
        <CardContent>
            <TextField
             onChange={onChangeFilter}
                id="outlined-basic"
                label="Titulo"
                variant="outlined"
                value={titleFilter}
            />
        </CardContent>
    </Card>

}

export default GratitudesFilters