import { render, screen } from '@testing-library/react'
import Blog from './blog'
import userEvent from '@testing-library/user-event'

test('renders content', async () => {
  //se simula un inicio de sesión
  const user = userEvent.setup()
  console.log('user logueado?: ', user != null)

  // Proveer todas las funciones requeridas como props
  const deleteBlog = vi.fn()
  const like = vi.fn()

  //modelar un blog
  const blog = {
    title: 'Este es un render de prueba',
    url: 'www.testloco.com',
    author: 'AgusFeliz',
    likes: 10,
    id: '1',
    user: {
      id: '12345',
      username: 'testuser',
      name: 'Test User'
    }
  }


  //renderizar el blog

  render(<Blog blog={blog} deleteBlog={deleteBlog} like={like} />)

  //verificamos se que muestre el título

  const element = screen.getByText('Este es un render de prueba')
  expect(element)

  //verificamos que no se muestre por defecto el url y los likes

  const url = screen.queryByTestId('url')
  expect(url).not.toBeVisible()
  const likeButton= screen.getByTestId('like')
  expect(likeButton).not.toBeVisible()

  //damos clic en mostrar detalles

  const mostrarButton = screen.getByText('Mostrar detalles')
  await user.click(mostrarButton)

  //ahora el botón like y la url son visibles debería ser visible

  const likeButton2= await screen.getByTestId('like')
  expect(likeButton2).toBeVisible()

  const url2= await screen.getByTestId('url')
  expect(url2).toBeVisible()
  
  //damos clic en el boton like y verificamos que se llama a la función 2 veces
  await user.click(likeButton2)
  await user.click(likeButton2)
  expect(like.mock.calls).toHaveLength(2)

})
