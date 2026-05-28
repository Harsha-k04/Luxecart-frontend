import Navbar from "./navbar";

function LayoutWrapper({ children, cartItemCount = 0 }) {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Navbar */}
      <Navbar cartItemCount={cartItemCount} />

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* Brand */}
            <div className="md:col-span-2">
              <span className="text-2xl font-bold text-primary">
                LuxeCart
              </span>
              <p className="mt-4 text-sm text-muted max-w-md">
                Curating the finest luxury timepieces for discerning collectors.
                Each watch represents the pinnacle of craftsmanship.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-sm text-muted hover:text-primary transition">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/#collection" className="text-sm text-muted hover:text-primary transition">
                    Collection
                  </a>
                </li>
                <li>
                  <a href="/cart" className="text-sm text-muted hover:text-primary transition">
                    Cart
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li>support@luxecart.com</li>
                <li>+91 98765 43210</li>
                <li>Bangalore, India</li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted">
              © {new Date().getFullYear()} LuxeCart. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LayoutWrapper;