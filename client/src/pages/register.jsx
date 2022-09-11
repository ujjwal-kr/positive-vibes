import { useForm } from '@mantine/form';
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

import {
    createStyles,
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    Button,
    Anchor,
    Stack,
} from '@mantine/core';

const useStyles = createStyles(() => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
    },

    paper: {
        width: '40%',
        marginTop: '10%',

        [`@media (max-width: 600px)`]: {
            width: '90%'
        },
    }

}))

export default function Register() {
    const navigate = useNavigate()
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    function login() {
        navigate('/login')
    }

    const { classes } = useStyles();

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.paper} radius="md" p="xl" withBorder>
                <Text size="lg" weight={500}>
                    Register
                </Text>

                <form onSubmit={form.onSubmit(async (data) => {
                    await AuthService.register(data).then(() => {
                        navigate("/login")
                    }).catch(e => {
                        alert("Something went wrong, check logs")
                    })
                 })}>
                    <Stack>
                        <TextInput
                            required
                            label="Name"
                            value={form.values.name}
                            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                        />

                        <TextInput
                            required
                            label="Email"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={form.errors.email && 'Invalid email'}
                        />

                        <PasswordInput
                            required
                            label="Password"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={form.errors.password && 'Password should include at least 6 characters'}
                        />
                    </Stack>

                    <Group position="apart" mt="xl">
                        <Anchor
                            component="button"
                            type="button"
                            color="dimmed"
                            onClick={() => login()}
                            size="xs"
                        >
                            Aready have an account? Login
                        </Anchor>
                        <Button
                            variant="gradient"
                            gradient={{ from: 'red', to: 'yellow', deg: 60 }}
                            type="submit">Register</Button>
                    </Group>
                </form>
            </Paper>
        </div>
    );
}