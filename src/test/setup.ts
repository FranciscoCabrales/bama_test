import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import '@testing-library/jest-dom';


// Extender las expectativas de Vitest con los matchers de testing-library
expect.extend(matchers)

// Limpiar después de cada prueba
afterEach(() => {
  cleanup()
})