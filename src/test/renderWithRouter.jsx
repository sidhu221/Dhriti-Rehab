import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

// Most components use <Link>/<NavLink>, which throw outside a Router context.
export function renderWithRouter(ui, { route = "/" } = {}) {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>)
}
