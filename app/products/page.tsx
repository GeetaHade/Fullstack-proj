import ProductsList from "../ProductsList";

export default function ProductsPage(){
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header Section */}
            <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-4">Our Collection</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Discover our handcrafted merchandise featuring original artwork and premium materials
                    </p>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">All Products</h2>
                    </div>
                    <ProductsList />
                </div>
            </section>
        </div>
    );
}
