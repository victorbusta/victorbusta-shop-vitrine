-- CreateTable
CREATE TABLE "Admin" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Print" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "creation_date" TIMESTAMP(3) NOT NULL,
    "added_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Print_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "print_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "buffer" BYTEA NOT NULL,
    "size" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Format" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "print_id" INTEGER NOT NULL,

    CONSTRAINT "Format_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customer_firstname" TEXT NOT NULL,
    "customer_lastname" TEXT NOT NULL,
    "customer_email" TEXT NOT NULL,
    "shipping_adress" TEXT NOT NULL,
    "shipping_postalcode" TEXT NOT NULL,
    "shipping_city" TEXT NOT NULL,
    "shipping" BOOLEAN NOT NULL,
    "shipped" BOOLEAN NOT NULL,
    "validation_token" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FormatToOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Document_print_id_key" ON "Document"("print_id");

-- CreateIndex
CREATE UNIQUE INDEX "_FormatToOrder_AB_unique" ON "_FormatToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_FormatToOrder_B_index" ON "_FormatToOrder"("B");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_print_id_fkey" FOREIGN KEY ("print_id") REFERENCES "Print"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Format" ADD CONSTRAINT "Format_print_id_fkey" FOREIGN KEY ("print_id") REFERENCES "Print"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FormatToOrder" ADD CONSTRAINT "_FormatToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Format"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FormatToOrder" ADD CONSTRAINT "_FormatToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
