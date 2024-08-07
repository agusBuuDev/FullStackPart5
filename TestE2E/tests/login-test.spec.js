const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith } = require('./test-helper')

describe('Blogs App', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
    })

    test('Prueba de login', async ({ page }) => {

        await loginWith(page, 'Manu766', 'manu1234')
        await expect(page.getByText('Bienvenido/a: Manu766')).toBeVisible()
    })

    test('agregando un blog', async ({ page }) => {

        //primero login

        await loginWith(page, 'Manu766', 'manu1234')
        await expect(page.getByText('Bienvenido/a: Manu766')).toBeVisible()

        //segundo cargar blog

        await page.getByRole('button', { name: 'Agregar Blog' }).click()
        await page.getByLabel('Título:').fill('Estoy Insertando un Blog desde el entorno de pruebas')
        await page.getByLabel('URL:').fill('www.pruebas.com')
        await page.getByLabel('Author:').fill('agusBuDev')
        await page.getByLabel('Likes:').fill('25')
        await page.getByRole('button', { name: 'Guardar' }).click()
        await expect(page.getByText('Estoy Insertando un Blog desde el entorno de pruebas')).toBeVisible()

        //seleccionando el blog creado

        const blogText = 'Estoy Insertando un Blog desde el entorno de pruebas'
        await page.waitForSelector(`text=${blogText}`, { timeout: 10000 })
        console.log('Blog encontrado:', await page.getByText(blogText).innerText())


        // Seleccionar el blog creado
        const newBlog = await page.getByText(blogText)
        const newBlogElement = await newBlog.locator('..'); // Subir un nivel en el DOM
        console.log('el elemento fue seleccionado: ', newBlogElement)
        await newBlogElement.getByRole('button', { name: 'Mostrar detalles' }).click()
        // Obtener el ID del blog
        const blogId = await newBlogElement.getAttribute('id')
        console.log('Blog ID:', blogId)
        //obtener los likes

        const likesElement = await newBlog.locator(`[data-testid="likes-${blogId}"]`)
        const likesText = await likesElement.textContent()
        console.log('Los likes de este blog son:', likesText)

        await newBlogElement.getByRole('button', { name: 'like' }).click()
        await page.waitForTimeout(2000)

        const newLikesText = await likesElement.textContent()

        console.log('los likes ahora son:', newLikesText)
        page.on('dialog', async dialog => {
            console.log('Dialog message:', dialog.message())
            await dialog.accept() // Confirmar el diálogo
        })

        await newBlogElement.getByRole('button', { name: 'borrar' }).click()

        await page.waitForTimeout(2000)
        // Verificar que el blog ha sido eliminado
        await expect(page.getByText(blogText)).not.toBeVisible()

        console.log('fin de la prueba, el post se eliminó correctamente')

    })


    test('solo el usuario puede borrar el post', async ({ page }) => {
        await page.waitForSelector('.blog')
        const blogs = await page.locator('.blog').all()
        console.log('cantidad de blogs: ', blogs.length)

        for (const blog of blogs) {
            const showDetailsButton = blog.locator('button').filter({ hasText: 'Mostrar detalles' })
            await showDetailsButton.click()
            await expect(showDetailsButton.getByText('borrar')).not.toBeVisible()
            console.log('el botón borrar no es visible en este post')
        }

    })


    test('inicio de sesión fallido', async ({ page }) => {
        await loginWith(page, 'Manu766', 'manu123')
        const errorDiv = await page.locator('.loginError')
        await expect(errorDiv).toContainText('Password or user incorrect')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')


    })

    test('verificar que los likes estén ordenados', async ({ page }) => {
        await page.waitForSelector('.blog')
        const blogs = await page.locator('.blog').all()
        console.log('cantidad de blogs: ', blogs.length)
        const arrLikes = []
        for (const blog of blogs) {
            const blogId= await blog.getAttribute('id')
            const likesElement = await blog.locator(`[data-testid="likes-${blogId}"]`)
            const likesText = await likesElement.textContent()
            console.log('Los likes de este blog son:', likesText)
            arrLikes.push(Number(likesText))

        }

        console.log('el array de likes: ', arrLikes)

        let postOrderedByLikes= true

        for(let i=0; i<arrLikes.length; i++){
            if(arrLikes[i]<arrLikes[i+1]){
                postOrderedByLikes= false
            } 
        }

        expect(postOrderedByLikes).toBe(true)


    })
})
