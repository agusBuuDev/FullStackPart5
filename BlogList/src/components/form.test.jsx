import { render, screen } from '@testing-library/react'
import Form from './form'
import userEvent from '@testing-library/user-event'

test('Formulario blog post', async()=>{
    const user = userEvent.setup()
    const creaBlog= vi.fn()

    render(<Form creaBlog={creaBlog} />)

    const title = screen.getByLabelText('Título:')
    const url = screen.getByLabelText('URL:')
    const author = screen.getByLabelText('Author:')
    const likes = screen.getByLabelText('Likes:')
    const sendButton = screen.getByText('Guardar')

    await user.type(title, 'Un blog de prueba')
    await user.type(url, 'www.pruebas.com')
    await user.type(author, 'AgusBuu')
    await user.type(likes,' 5')
    await user.click(sendButton)


    expect(creaBlog.mock.calls).toHaveLength(1)
    console.log(creaBlog.mock.calls[0][0].content)
    const calledWith = creaBlog.mock.calls[0][0]
    expect(calledWith.title).toBe('Un blog de prueba')

})