package com.example.demo.Utils;

public class PriceConverter {
    public static double convertPriceToDouble(String price) {
        try {
            // Remove currency symbol and parse the rest
            String priceWithoutSymbol = price.replace("₹", "").trim();
            return Double.parseDouble(priceWithoutSymbol);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid price format: " + price);
        }
    }
}


